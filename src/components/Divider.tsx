import React from 'react';

type Props = {
    spacing: number;
};

export const Divider: React.FC<Props> = (props: Props) => {
    return <div style={{ marginTop: props.spacing }} />;
};
