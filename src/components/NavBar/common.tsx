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
import * as data from "data";
import * as player_cache from "player_cache";
import * as preferences from "preferences";

let body = $(document.body);

export function setTheme(theme) {
    data.set("theme", theme);
    _update_theme(theme);
}

export function toggleTheme() {
    if (data.get("theme") === "dark") {
        setTheme("light");
    } else {
        setTheme("dark");
    }
}

function _update_theme(theme) {
    if (body.hasClass(theme)) {
        return;
    }
    body.removeClass("light dark");
    body.addClass(theme);
}

/*
export function previewTheme(theme) {
    _update_theme(theme);
}
export function exitThemePreview() {
    _update_theme(data.get("theme"));
}
*/
