import { CSSProperties, ChangeEvent, FC } from 'react';
import { COLORS } from '../GlobalStyle';

export interface InputsProps {
    csvValue: string;
    onCsvValueChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    additionalInfo: string;
    onAdditionalInfoChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const inputStyles: CSSProperties = {
    borderRadius: '10px',
    padding: '1rem',
    border: `1px solid ${COLORS.secondaryColor}`,
    width: '100%',
    marginTop: '0.25rem',
};

export const Inputs: FC<InputsProps> = ({
    csvValue,
    onCsvValueChange,
    additionalInfo,
    onAdditionalInfoChange,
}) => {
    return (
        <>
            <h2>CSV Input</h2>
            <div>Paste or type your CSV here:</div>
            <textarea
                value={csvValue}
                rows={25}
                style={inputStyles}
                onChange={onCsvValueChange}
            />
            <label style={{ marginTop: '1rem', display: 'block' }}>
                <p>Additional Info to add to all contacts:</p>
                <input
                    placeholder="E.g. name of your child's school etc"
                    type="text"
                    style={inputStyles}
                    value={additionalInfo}
                    onChange={onAdditionalInfoChange}
                />
            </label>
        </>
    );
};
