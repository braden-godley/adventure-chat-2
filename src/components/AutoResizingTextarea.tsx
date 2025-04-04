import React, { useRef, useEffect } from 'react';

interface AutoResizingTextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'> {
    value: string;
    onChange: (value: string) => void;
}

const AutoResizingTextarea: React.FC<AutoResizingTextareaProps> = ({ 
    value, 
    onChange,
    className = '',
    ...props 
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [value]);

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`resize-none min-h-[44px] overflow-hidden ${className}`}
            rows={1}
            {...props}
        />
    );
};

export default AutoResizingTextarea; 