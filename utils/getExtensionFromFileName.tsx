import { Extension } from './getColorByExtension';

export const getExtensionFromFileName = (filename: Extension) => {
    return filename.split('.').pop();
};
