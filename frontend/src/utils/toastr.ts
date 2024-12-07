import * as toastr from 'toastr';


const defaults: ToastrOptions = {
    timeOut: 4000,
    progressBar: true,
}

interface ToastrInterface {
    title?: string,
    body: string,
    options?: ToastrOptions
}

export async function ToastrSuccess({
    title, body, options
}: ToastrInterface) {
    return new Promise(resolve => {
        const finalOptions = { ...defaults, ...options };

        toastr.success(body, title, finalOptions)

        setTimeout(() => {
            return resolve(true);
        }, (finalOptions.timeOut || 0) + 150);
    })
}


export async function ToastrError({
    title, body, options
}: ToastrInterface) {
    return new Promise(resolve => {
        const finalOptions = { ...defaults, ...options };

        toastr.error(body, title, finalOptions)

        setTimeout(() => {
            return resolve(true);
        }, (finalOptions.timeOut || 0) + 150);
    })
}
