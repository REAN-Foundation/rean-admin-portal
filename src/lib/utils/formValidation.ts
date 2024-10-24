import { z, ZodSchema } from 'zod';

export const validateFormData = async <T extends ZodSchema>(
  request: Request, 
  schema: T
) => {
  const data = await request.formData();
  const formData = Object.fromEntries(
    Array.from(data.entries()).map(([key, value]) => [key, typeof value === 'string' ? value : ''])
  );
  try {
    const result = schema.parse(formData);
    return { result, errors: null };
  } catch (err: any) {
    const { fieldErrors: errors } = err.flatten();
    return { result: formData, errors };
  }
};

export const validateFormData_ = async <T extends ZodSchema>(
  formData: FormData,
  schema: T
) => {
  const data = Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => {
      if (formData.getAll(key).length > 1) {
        return [key, formData.getAll(key)];
      } else {
        return [key, typeof value === 'string' ? value : ''];
      }
    })
  );
  try {
    const result = schema.parse(data);
    return { result, errors: null };
  } catch (err: any) {
    const { fieldErrors: errors } = err.flatten();
    return { result: data, errors };
  }
};