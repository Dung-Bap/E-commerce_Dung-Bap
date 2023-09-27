import { Link } from 'react-router-dom';

function Button({
    onClick,
    to,
    href,
    disabled = false,
    leftIcon = false,
    rightIcon = false,
    children,
    styles,
    type,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    if (disabled) {
        Object.keys(props).forEach(key => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }
    return (
        <Comp
            className={
                styles
                    ? styles
                    : 'text-white bg-black p-2 rounded-md hover:text-black hover:bg-white mr-[10px] px-4 py-2 min-w-[88px]'
            }
            {...props}
        >
            {leftIcon && <span>{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
