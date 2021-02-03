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
import { useEffect, useState } from "react";
import * as preferences from "preferences";
import { NavBarOriginal } from "./NavBarOriginal";
import { NavBarLeftFlat } from "./NavBarLeftFlat";
import { NavBarLeftExpanding } from "./NavBarLeftExpanding";
import { NavBarTopMore } from "./NavBarTopMore";
import { NavBarTopDropdowns } from "./NavBarTopDropdowns";


export function NavBar(props:{}):JSX.Element {
    let [style, setStyle] = useState(preferences.get("experiment.nav"));

    useEffect(() => {
        preferences.watch("experiment.nav", setStyle, true);
        return () => {
            preferences.unwatch("experiment.nav", setStyle);
        };
    }, []);

    switch (style) {
        case "original": return <NavBarOriginal />;
        case "left-flat": return <NavBarLeftFlat />;
        case "left-expanding": return <NavBarLeftExpanding />;
        case "top-more": return <NavBarTopMore />;
        case "top-dropdowns": return <NavBarTopDropdowns />;
    }

    return <div>ERROR: Unhandled nav bar style: {style}</div>;
}
