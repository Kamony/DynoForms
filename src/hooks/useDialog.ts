import { useCallback, useState } from 'react';

export const useDialog = (init = false) => {
    const [open, setOpen] = useState<boolean>(init);

    const handleOpen = useCallback(() => setOpen(true), [open]);
    const handleClose = useCallback(() => setOpen(false), [open]);

    return { open, handleOpen, handleClose };
};
