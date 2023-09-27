import React, { memo } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export const MarkDownEditor = ({ label, value, changeValue, name, invalidFields, setInvalidFields }) => {
    return (
        <div className="mt-4">
            <label className="text-white">{label}</label>
            <Editor
                apiKey={process.env.REACT_APP_API_TINYMCE}
                initialValue={value}
                onChange={e => changeValue(prev => ({ ...prev, [name]: e.target.getContent() }))}
                onFocus={() => setInvalidFields && setInvalidFields([])} // khi focus thì xoá invalid đi
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'code',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                        'preview',
                        'help',
                        'wordcount',
                    ],
                    toolbar:
                        'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
            />
            {invalidFields?.some(el => el.name === name) && (
                <span className="text-main text-[12px] font-light">
                    {invalidFields?.find(el => el.name === name).message}
                </span>
            )}
        </div>
    );
};
export default memo(MarkDownEditor);
