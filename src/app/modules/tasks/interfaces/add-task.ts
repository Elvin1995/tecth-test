import {ITasks} from './tasks.interface';

export const AddTask = (data: ITasks) => {
  return {
    id: data.id,
    label: data.label,
    description: data.description,
    category: data.category,
    done: data.done,
  };
};
