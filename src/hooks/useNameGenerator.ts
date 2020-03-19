import { uuid } from '../utils/uuid';
import { useStore } from '../store';

export const useNameGenerator = () => {
    const [elements] = useStore(s => s.elements);

    const isUniqueName = (name: string) => {
        const names = elements.map(el => el.name);
        return !names.includes(name);
    };

    const createName = (label: string) => {
        const cleanName = label
            .trim()
            .replace(' ', '')
            .toLowerCase();

        if (isUniqueName(cleanName)) {
            return cleanName;
        } else {
            return `${cleanName}-${uuid()}`;
        }
    };

    return createName;
};
