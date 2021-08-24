import React, { Fragment, ReactNode, useEffect, useState } from "react";
import IconFacebook from "../icons/IconFacebook";
import IconLinkedin from "../icons/IconLinkedin";
import IconYoutube from "../icons/IconYoutube";
import IconLine from "../icons/IconLine";
import Grid from "@material-ui/core/Grid";
import NavLink from "../links/NavLink";
import clsx from "clsx";
import { useLinkStyles } from "../links/LinkStyles";

interface ISocial {
    link: string;
    icon: ReactNode;
}

const FooterSocialList = () => {
    const linkClasses = useLinkStyles();
    const [list, setList] = useState<ISocial[] | undefined>(undefined);
    useEffect(() => {
        setList([
            {
                link: "https://www.facebook.com/CloudMileFans/",
                icon: <IconFacebook />,
            },
            {
                link: "https://www.linkedin.com/company/cloudmile/",
                icon: <IconLinkedin />,
            },
            {
                link: "https://www.youtube.com/channel/UC_FaTcAjgGsTOWHk6GcLUzw",
                icon: <IconYoutube />,
            },
        ]);
    }, []);
    return (
        <Fragment>
            {list && list.length
                ? list.map((item: ISocial, index: number) => {
                      return (
                          <Grid item key={index}>
                              <NavLink hrefPath={item.link} isLaunch={true} classNames={clsx(linkClasses.textLink)}>
                                  {item.icon}
                              </NavLink>
                          </Grid>
                      );
                  })
                : null}
        </Fragment>
    );
};
export default FooterSocialList;
