import {attributes, dia, shapes} from "@joint/core";
import ConstructorOptions = dia.Cell.ConstructorOptions;
import {useJointShape} from "@/joint-react/shapes/useJointShape";
import EndJSON = dia.Link.EndJSON;



type PropTy = {
    configOptions?: ConstructorOptions,
    source: EndJSON,
    target: EndJSON,
    labels?: dia.Link.Label[];
    vertices?: dia.Point[];
    root?: attributes.SVGAttributes,
    line?: attributes.SVGPathAttributes,
    wrapper?: attributes.SVGPathAttributes,
}

export function useLink(
    source: EndJSON,
    target: EndJSON,
    root?: attributes.SVGAttributes,
    line?: attributes.SVGPathAttributes,
    wrapper?: attributes.SVGPathAttributes,
    configOptions?: ConstructorOptions
) {
    useJointShape(() => {
        const sourceOrigin = source;
        const targetOrigin = target;
        const linkProps = {
            attrs: {
                root, line, wrapper
            }
        }
        const link = new shapes.standard.Link(linkProps, configOptions);
        link.source(sourceOrigin);
        link.target(targetOrigin);
        // if (attrs) {
        //     for (const [key, val] of Object.entries(attrs)) {
        //         link.attr(key, val);
        //     }
        // }
        return link
    }, [source, target, root, line, wrapper, JSON.stringify(configOptions)]);
}


export function Link(props: PropTy) {
    const {source, target, root, line, wrapper, configOptions, ...linkProps} = props;

    useLink(source, target, root, line, wrapper, configOptions);

    return <>
    </>
}
