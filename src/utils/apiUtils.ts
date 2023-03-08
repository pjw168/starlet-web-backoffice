import { message } from 'antd';
import axios, { AxiosError } from 'axios';

export function isAxiosError(error: unknown) {
  if (axios.isAxiosError(error)) {
    return true;
  } else {
    return 'An unexpected error occurred';
  }
}

export function getAxiosErrorStatus(error: unknown) {
  const err = error as AxiosError;
  return err?.response?.status;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dummyRequest(options: any) {
  setTimeout(() => {
    options.onSuccess('ok');
  }, 0);
}

export function handleError(error: unknown) {
  message.error(`${error}`);
}

export function transformRequestToFormData(
  req: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  },
  allowNullOrUndefined?: boolean,
) {
  const formData = new FormData();
  Object.entries(req).forEach(([key, value]) => {
    // if (value !== undefined) {
    //   if (value === null) {
    //     if (allowNullOrUndefined) {
    //       formData.append(key, value);
    //     }
    //   }
    // }
    if (allowNullOrUndefined) {
      formData.append(key, value);
    } else {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    }
  });
  return formData;
}
