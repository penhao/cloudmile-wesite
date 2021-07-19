import React from 'react';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import TextClipEffect from "../effects/TextClipEffect";
import { Variant } from "@material-ui/core/styles/createTypography";
import clsx from "clsx";

interface Props {
    variant?: Variant;
    component?: any;
    color?: string;
    className?: string | null;
    innerHTML?: boolean;
    children?: React.ReactNode;
}

interface StyleProps {
    color: string
}

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        position: 'relative',
        fontWeight: 700,
        letterSpacing: 'normal',
        lineHeight: 1.19,
        zIndex: 3,
        color: ({ color }: StyleProps) => {
            return (color === 'black')
                ? theme.palette.common.black
                : (color === 'white')
                    ? theme.palette.common.white
                    : color;
        },
        [theme.breakpoints.up('sm')]: {
            lineHeight: 1.21
        },
        '& br': {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block'
            }
        }
    }
}));
const SectionTitle = ({ variant = 'h2', component = 'h2', color = 'black', innerHTML = true, className = null, children }: Props) => {
    const classes = useStyles({ color });
    return (
        <TextClipEffect>
            <Typography
                variant={variant} component={component === undefined ? variant : component}
                className={clsx(classes.title, className)}
                dangerouslySetInnerHTML={
                    { __html: children.toString() }
                } />
        </TextClipEffect>
    );
};
export default SectionTitle;
