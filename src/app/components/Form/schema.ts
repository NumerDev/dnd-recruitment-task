import { z } from 'zod';

export const addMenuFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Nazwa musi mieć przynajmniej 1 znak' }),
  link: z.union([
    z.literal(''),
    z.string().trim().url({ message: 'Link musi być poprawnym adresem URL' }),
  ]),
});

export type AddMenuFormSchema = z.infer<typeof addMenuFormSchema>;

export const defaultFormValues: AddMenuFormSchema = {
  name: '',
  link: '',
};
