export const safeReadParams = (props, key) => {
    if (props && props.match && props.match.params) {
        return props.match.params[key];
    }
    return null;
}