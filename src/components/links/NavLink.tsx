import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useLinkStyles } from "./LinkStyles";
import { removeParam } from "../../utils/Utils";

interface Props {
    hrefPath: string;
    fullWidth?: boolean;
    fullHeight?: boolean;
    asPath?: string | null;
    classNames?: string;
    isLaunch?: boolean;
    textWrap?: boolean;
    underline?: boolean;
    children?: React.ReactNode;
}

const NavLink = ({
    hrefPath,
    asPath = null,
    classNames = null,
    isLaunch = false,
    textWrap = true,
    underline = false,
    fullWidth = false,
    fullHeight = false,
    children,
}: Props) => {
    const linkClasses = useLinkStyles({ underline, fullWidth, fullHeight, textWrap });
    const [hrefLink, setHrefLink] = useState("");
    const [asLink, setAsLink] = useState("");
    useEffect(() => {
        setHrefLink(`${hrefPath}`);
        setAsLink(
            asPath
                ? `${asPath}${removeParam("category", window.location.search)}`
                : `${hrefPath}${removeParam("category", window.location.search)}`
        );
    }, [hrefPath, asPath]);
    return (
        <Fragment>
            {isLaunch ? (
                <a
                    href={hrefLink}
                    target={"_blank"}
                    rel="noreferrer noopener"
                    className={clsx(linkClasses.link, classNames)}
                >
                    {children}
                </a>
            ) : (
                <Link href={hrefLink} as={asLink} passHref>
                    <a className={clsx(linkClasses.link, classNames)}>{children}</a>
                </Link>
            )}
        </Fragment>
    );
};
export default NavLink;
