/*
 * Copyright (C) 2012-2020  Online-Go.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import * as React from "react";
import { useEffect } from "react";
import * as preferences from "preferences";
import { useState } from "react";
import { DismissableNotification } from "DismissableNotification";
import { _ } from "translate";


export function NavStylePicker(props: {}): JSX.Element {
    let [style, setStyle] = useState(preferences.get("experiment.nav"));

    useEffect(() => {
        preferences.watch("experiment.nav", setStyle, true);
        return () => {
            preferences.unwatch("experiment.nav", setStyle);
        };
    }, []);

    return (
        <DismissableNotification dismissedKey="experiment.nav" className="NavStylePicker" >
            <div>
                {_("We're trying out ways to improve site navigation, click these buttons bellow to try out some different ideas and let us know what you think, thanks!")}
            </div>

            <div>
                <button className={style === "original" ? "primary" : ""} onClick={() => preferences.set("experiment.nav", "original")}>
                    <span className='nav-icon original' />
                </button>

                <button className={style === "left-expanding" ? "primary" : ""} onClick={() => preferences.set("experiment.nav", "left-expanding")}>
                    <span className='nav-icon left-expanding' />
                </button>

                <button className={style === "left-flat" ? "primary" : ""} onClick={() => preferences.set("experiment.nav", "left-flat")}>
                    <span className='nav-icon left-flat' />
                </button>

                <button className={style === "top-dropdowns" ? "primary" : ""} onClick={() => preferences.set("experiment.nav", "top-dropdowns")}>
                    <span className='nav-icon top-dropdowns' />
                </button>
                <button className={style === "top-more" ? "primary" : ""} onClick={() => preferences.set("experiment.nav", "top-more")}>
                    <span className='nav-icon top-more' />
                </button>
            </div>
        </DismissableNotification>
    );
}
