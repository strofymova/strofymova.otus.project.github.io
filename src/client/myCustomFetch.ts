/* global RequestInit */

import { URL } from './config';

export function myCustomFetch<T = Response>({ input, init }: { input: string; init?: RequestInit }): Promise<T> {
  return fetch(`${URL}${input}`, init).then(async (res) => {
    if (res.status === 200) return res.json();
    return Promise.reject(await res.json());
  });
}

export const myCustomXHR = <T = Response>(
  body: FormData,
  {
    onProgress,
  }: {
    onProgress: (loaded: number, total?: number) => void;
  }
): Promise<T> =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = function (event) {
      onProgress(event.loaded, event.total);
    };
    xhr.onload = function () {
      if (xhr.status !== 200) {
        reject(xhr);
      } else {
        resolve(JSON.parse(xhr.response));
      }
    };

    xhr.onerror = () => {
      Object.assign(xhr, { message: 'unknown error' });
      reject(xhr);
    };

    xhr.open('POST', `${URL}/upload`);

    xhr.send(body);
  });
