import { CreateMediaItemDto } from '../../../api';
type FormConfigType = { name: string; label: string; value?: any };
export type FormConfig<Keys extends string> = { [key in Keys]?: FormConfigType };

export const mediaFormConfig: FormConfig<keyof CreateMediaItemDto> = {
  description: { name: 'description', label: 'Description' },
  title: { name: 'title', label: 'Title' },
  summary: { name: 'summary', label: 'Summary' },
} as const;
