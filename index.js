"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonToOrg = exports.orgToJson = void 0;
/**
 * Converts org string to json
 * @constructor
 * @param {string} f - array of type Note
 */
const orgToJson = (f) => {
    const file = f.split("\n").filter((n) => n.trim() !== "");
    const countLevel = (i, item) => {
        let level = 0;
        for (; i < item.length; i++) {
            if (new RegExp(/\*/).test(item[i])) {
                level++;
            }
            else
                break;
        }
        return [level, i];
    };
    const extractTag = (i, item) => {
        let tag = "";
        for (; i < item.length; i++) {
            if (!new RegExp(/\:/).test(item[i])) {
                tag += item[i];
            }
            else
                break;
        }
        return [tag, i];
    };
    const extractState = (i, item) => {
        let state = "";
        for (; i < item.length; i++) {
            if (new RegExp(/[A-Z]/).test(item[i])) {
                state += item[i];
            }
            else
                break;
        }
        if (state === "TODO" || state === "DONE")
            return [state, i];
        return ["", 0];
    };
    const notes = [];
    let previous = {};
    let prevLvl = -Infinity;
    while (file.length) {
        const item = file.shift();
        const note = {
            title: "",
            description: "",
            state: "",
            tags: [],
            items: [],
            level: 0,
            properties: {},
        };
        let level = 0;
        for (let i = 0; i < item.length;) {
            if (new RegExp(/\*/).test(item[i]) && i === 0) {
                // level
                const [lvl, ni] = countLevel(i, item);
                level = lvl;
                if (level === 0)
                    break;
                if (!previous[level - 1] && level > 1)
                    break;
                note.level = lvl;
                prevLvl = lvl;
                i = ni;
            }
            else if (new RegExp(/\:/).test(item[i])) {
                //tag
                const [tag, ni] = extractTag(i + 1, item);
                i = ni;
                note.tags.push(tag);
            }
            else if (new RegExp(/[A-Z]/).test(item[i]) && i - 1 === level) {
                // state
                const [state, ni] = extractState(i, item);
                if (ni > 0) {
                    i = ni;
                    note.state = state;
                }
                else {
                    note.title += item[i];
                }
            }
            else {
                note.title += item[i];
            }
            i++;
        }
        if (level === 0) {
            previous[prevLvl].description += item.trim() + "\n";
            continue;
        }
        else if (previous[level - 1] && previous[level - 1].level < level) {
            previous[level - 1].items.push(note);
        }
        else {
            notes.push(note);
        }
        previous[level] = note;
    }
    return notes;
};
exports.orgToJson = orgToJson;
/**
 * Converts array of Notes to org string
 * @constructor
 * @param {Array<Note>} notes - array of type Note
 */
const jsonToOrg = (notes) => {
    let file = "";
    const buildTags = (tags) => tags.reduce((curr, acc) => curr + ` :${acc}:`, "");
    for (let item of notes) {
        const tags = buildTags(item.tags);
        file += "*".repeat(item.level);
        file += item.state ? ` ${item.state}` : "";
        file += ` ${item.title}`;
        file += tags ? ` ${tags}` : "";
        file += "\n";
        file += item.description ? `${item.description}\n` : "";
        file += (0, exports.jsonToOrg)(item.items);
    }
    return file;
};
exports.jsonToOrg = jsonToOrg;
