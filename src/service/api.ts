import fetch, { Response, Request } from 'cross-fetch';

export namespace RestApi {
    const basePath = '/api'
    export interface IOptions {
        headers: Record<string, string>
    }
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
    async function _fetch(res: Response) {
        if (res.ok && res.json) {
            return res.json();
        }

        console.log(res)
        throw Error(res.statusText);
    }

    function buildUrl(url: string) {
        return `${basePath}${url}`;
    }

    export async function get<T>(url: string, options?: IOptions): Promise<T> {
        let raw = await fetch(buildUrl(url), {
            method: 'GET',
            headers: {
                ...headers,
                ...(options?.headers)
            }
        })
            ;

        return await _fetch(raw)
    }
    export async function post<T>(url: string, data: Record<string, any>, options?: IOptions): Promise<T> {
        let raw = await fetch(buildUrl(url), {
            method: 'POST',
            headers: {
                ...headers,
                ...(options?.headers)
            },
            body: JSON.stringify(data || {})
        });

        return await _fetch(raw)
    }
}
