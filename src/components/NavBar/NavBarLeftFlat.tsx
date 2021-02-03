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
import { useEffect, useState } from "react";
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



export function NavBarLeftFlat(props:{}):JSX.Element {
    const [user, setUser] = useState(data.get("config.user"));

    useEffect(() => {
        data.watch("config.user", setUser);
        return () => data.unwatch("config.user", setUser);
    }, []);


    return (
        <div id="NavBar">
            <span className="ogs-nav-logo-container">
                <span className="ogs-nav-logo"/>
            </span>


            <ul id="items">
                {user && <li><Link to="/overview"><i className="fa fa-home"></i>{_("Home")}</Link></li>}
                {user.anonymous && <li><Link to="/sign-in"><i className="fa fa-sign-in"></i>{_("Sign In")}</Link></li>}
                {user && <li><Link to="/play"><i className="fa ogs-goban"></i>{_("Play")}</Link></li>}
                {user && <li><span className="fakelink" onClick={() => createDemoBoard()}><i className="fa fa-plus"></i>{_("Demo Board")}</span></li>}
                <li><Link to="/observe-games"><i className="fa fa-eye"></i>{_("Games")}</Link></li>
                <li><Link to="/leaderboards"><i className="fa fa-list-ol"></i>{_("Leaderboards")}</Link></li>
                <li><Link to="/chat"><i className="fa fa-comment-o"></i>{_("Chat")}</Link></li>
                <li className="divider"></li>

                <li><Link to="/learn-to-play-go"><i className='fa fa-graduation-cap'></i>{_("Learn to play Go")}</Link></li>
                <li><Link to="/puzzles"><i className="fa fa-puzzle-piece"></i>{_("Puzzles")}</Link></li>
                <li><Link to="/joseki"><i className="fa fa-sitemap"></i>{_("Joseki")}</Link></li>
                {user && <li><Link to={`/library/${user.id}`}><i className="fa fa-book"></i>{_("SGF Library")}</Link></li>}

                <li><Link to="/tournaments"><i className="fa fa-trophy"></i>{_("Tournaments")}</Link></li>
                <li><Link to="/ladders"><i className="fa fa-list-ol"></i>{_("Ladders")}</Link></li>
                <li><Link to="/groups"><i className="fa fa-users"></i>{_("Groups")}</Link></li>
                <li><a href="http://forums.online-go.com/" target="_blank"><i className="fa fa-comments"></i>{_("Forums")}</a></li>
                <li><Link to="/docs/about"><i className="fa fa-info-circle"></i>{_("About")}</Link></li>
                <li><a href="https://github.com/online-go/online-go.com/wiki"><i className="fa fa-question-circle"></i>{_("Documentation & FAQ")}</a></li>
                <li><Link to="/docs/other-go-resources"><i className="fa fa-link"></i>{_("Other Go Resources")}</Link></li>

                {user && <li className="divider"></li>}
                <li><Link to="/user/supporter"><i className="fa fa-star"></i>{_("Support OGS")}</Link></li>
                {user && <li><Link to={`/user/view/${user.id}`}><i className="fa fa-user"></i>{_("Profile")}</Link></li>}
                {user && <li><Link to="/user/settings"><i className="fa fa-gear"></i>{_("Settings")}</Link></li>}
                {user && <li><span className="fakelink" onClick={logout}><i className="fa fa-sign-out"></i>{_("Logout")}</span></li>}



                {user && (user.is_moderator || user.is_announcer) && <li className="divider"></li>}
                {user && user.is_moderator && <li><Link className="admin-link" to="/moderator"><i className="fa fa-gavel"></i>{_("Moderator Center")}</Link></li>}
                {user && (user.is_moderator || user.is_announcer) && <li><Link className="admin-link" to="/announcement-center"><i className="fa fa-bullhorn"></i>{_("Announcement Center")}</Link></li>}
                {user && user.is_superuser && <li><Link className="admin-link" to="/admin"><i className="fa fa-wrench"></i> Admin</Link></li>}
            </ul>
        </div>
    );
}
