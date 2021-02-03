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
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { browserHistory } from "ogsHistory";
import { _, current_language, languages } from "translate";
import { PlayerIcon } from "PlayerIcon";
import { post, get, abort_requests_in_flight } from "requests";
import { acceptGroupInvite, acceptTournamentInvite, rejectGroupInvite, rejectTournamentInvite, ignore, errorLogger } from "misc";
import { LineText } from "misc-ui";
import { challenge, createDemoBoard } from "ChallengeModal";
import { openNewGameModal } from "NewGameModal";
import { KBShortcut } from "KBShortcut";
import { LanguagePicker } from "LanguagePicker";
import { GobanThemePicker } from "GobanThemePicker";
import { IncidentReportTracker } from "IncidentReportTracker";
import { NotificationIndicator, TurnIndicator, NotificationList } from "Notifications";
import { TournamentIndicator } from "Announcements";
import { FriendIndicator } from "FriendList";
import { Player } from "Player";
import { ChatIndicator } from "Chat";
import { logout } from "SignIn";
import { toggleTheme, setTheme } from "./common";

let setThemeLight = setTheme.bind(null, "light");
let setThemeDark = setTheme.bind(null, "dark");



export function NavBarTopMore(props:{}):JSX.Element {
    const [user, setUser] = useState(data.get("config.user"));
    const [right_nav_active, setRightNavActive] = useState(false);
    const notification_list = useRef(null);

    useEffect(() => {
        data.watch("config.user", setUser);
        return () => data.unwatch("config.user", setUser);
    }, []);

    function toggleRightNav() {
        if (right_nav_active === false) {
            if (notification_list) {
                notification_list.current.markAllAsRead();
            }
        }
        setRightNavActive(!right_nav_active);
    }

    function closeRightNavAndClearSearch() {
        setRightNavActive(false);
    }


    return (
        <div id="NavBar">
            <span className="ogs-nav-logo-container">
                <span className="ogs-nav-logo"/>
            </span>


            <section className="left">
                {(!user.anonymous || null) && <Link to="/overview">{_("Home")}</Link>}
                {user && <Link to="/play">{_("Play")}</Link>}
                <Link to="/observe-games">{_("Games")}</Link>
                <Link to="/chat">{_("Chat")}</Link>
                <a target="_blank" href="https://forums.online-go.com/" rel="noopener">{_("Forums")}</a>
                {user && <Link to={`/user/view/${user.id}`}>{_("Profile")}</Link>}
                {/*
                <Link to="/puzzles">{_("Puzzles")}</Link>
                <Link to="/joseki">{_("Joseki")}</Link>
                <Link to="/tournaments">{_("Tournaments")}</Link>
                <Link to="/ladders">{_("Ladders")}</Link>
                <Link to="/groups">{_("Groups")}</Link>
                <Link to="/leaderboards">{_("Leaderboards")}</Link>
                */}
            </section>

            { user.anonymous ?
                <section className="right">
                    <i className="fa fa-adjust" onClick={toggleTheme} />
                    <LanguagePicker />
                    <Link className="sign-in" to={"/sign-in#" + window.location.pathname}>{_("Sign In")}</Link>
                </section>
                :
                <section className="right">
                    <IncidentReportTracker />
                    { preferences.get("show-tournament-indicator") && <TournamentIndicator /> }
                    <ChatIndicator />
                    <FriendIndicator />
                    <TurnIndicator />
                    <span className="icon-container" onClick={toggleRightNav}>
                        <NotificationIndicator />
                        <PlayerIcon user={user} size="64"/>
                        <i className="fa fa-caret-down" />
                    </span>
                </section>
            }

            {/*

                <Link to='/'>Incident Reports</Link>
                <Link to='/'>Tournament Icon</Link>
                <Link to='/'>Friends Online</Link>
                <Link to='/'>Search</Link>
                <Link to='/'>Move Indicator</Link>
                <Link to='/'>Notification</Link>

            */}


            <div className={"nav-menu-modal-backdrop " + ((right_nav_active) ? "active" : "")} onClick={closeRightNavAndClearSearch}/>

            {/* Right Nav */}
            {user &&
            <div className={"rightnav " + (right_nav_active ? "active" : "")}>
                <div style={{'textAlign': 'right'}}>
                    <Player user={user}  disable-cache-update />
                </div>

                <NotificationList ref={notification_list} />

                <LineText>{_("Theme")}</LineText>

                <div className="theme-selectors">
                    <button className="theme-button light"
                        onClick={setThemeLight}
                        ><i className="fa fa-sun-o"/></button>
                    <button className="theme-button dark"
                        onClick={setThemeDark}
                        ><i className="fa fa-moon-o"/></button>
                </div>

                <div className="theme-selectors">
                    <GobanThemePicker />
                </div>
            </div>
            }
        </div>
    );
}
