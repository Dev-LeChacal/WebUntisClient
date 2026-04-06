import { NetworkError } from "../errors/Network";

type QueuedTask = {
  execute: () => Promise<void>;
}

export class RequestManager {
  private queue: QueuedTask[] = [];
  private isProcessing = false;

  private readonly defaultHeaders: Record<string, string> = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Safari/537.36",
    "Cache-Control": "no-cache",
    "X-Requested-With": "XMLHttpRequest",
    Pragma: "no-cache"
  };

  public enqueue<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const task: QueuedTask = {
        execute: async () => {
          try {
            const result = await fn();
            resolve(result);
          } catch ( err ) {
            reject(err);
          }
        }
      };

      this.queue.push(task);
      void this.processQueue();
    });
  }

  public async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
    return this.enqueue(() =>
      fetch(url, {
        headers: {
          ...this.defaultHeaders,
          ...headers
        }
      }).then(res => {
        if ( !res.ok ) {
          throw new NetworkError(`${res.status} ${res.statusText}`);
        }

        return res.json() as Promise<T>;
      })
    );
  }

  public async getText(url: string, headers?: Record<string, string>): Promise<string> {
    return this.enqueue(() =>
      fetch(url, {
        headers: {
          ...this.defaultHeaders,
          ...headers
        }
      }).then(res => {
        if ( !res.ok ) {
          throw new NetworkError(`${res.status} ${res.statusText}`);
        }

        return res.text();
      })
    );
  }

  public async post<T>(url: string, body: object, headers?: Record<string, string>): Promise<T> {
    return this.enqueue(async () => {
      console.log("[POST]", url);

      try {
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            ...this.defaultHeaders,
            ...headers,
            "Content-Type": "application/json"
          },
        });

        console.log("[POST STATUS]", res.status);

        if ( !res.ok ) {
          throw new NetworkError(`${res.status} ${res.statusText}`);
        }

        const text = await res.text();

        return await (JSON.parse(text) as T);
      } catch ( err ) {
        console.log("[POST FAILED]", url, err);
        throw err;
      }
    });
  }

  private async processQueue(): Promise<void> {
    if ( this.isProcessing ) {
      return;
    }

    this.isProcessing = true;

    while ( this.queue.length > 0 ) {
      const task = this.queue.shift();

      if ( task === undefined ) {
        break;
      }

      await task.execute();
    }

    this.isProcessing = false;
  }
}