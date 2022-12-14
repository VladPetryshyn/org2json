import { v4 } from "uuid";

export interface Note {
  title: string;
  description: string;
  state: string;
  tags: Array<string>;
  items: Array<Note>;
  level: number;
  properties: { [key: string]: string };
}

interface Tags {
  [key: string]: number;
}

export type Notes = Note[];
// export type Titles = Array<Title>;

/**
 * Converts org string to json
 * @constructor
 * @param {string} f - array of type Note
 */
export const orgToJson = (f: string): { notes: Notes; tags: Tags } => {
  const file = f.split("\n").filter((n) => n.trim() !== "");

  const countLevel = (i: number, item: string): [number, number] => {
    let level = 0;
    for (; i < item.length; i++) {
      if (new RegExp(/\*/).test(item[i])) {
        level++;
      } else break;
    }
    return [level, i];
  };

  const extractTag = (i: number, item: string): [string, number] => {
    let tag = "";
    for (; i < item.length; i++) {
      if (new RegExp(/\:/).test(item[i])) {
        break;
      }
      tag += item[i];
    }
    if (tag.includes("//")) return ["", 0];
    return [tag, i];
  };

  const extractState = (i: number, item: string): [string, number] => {
    let state = "";
    for (; i < item.length; i++) {
      if (new RegExp(/[A-Z]/).test(item[i])) {
        state += item[i];
      } else break;
    }
    if (state === "TODO" || state === "DONE") return [state, i];
    return ["", 0];
  };

  const extractProperties = (item: string) => {
    const properties: { [key: string]: string } = {};

    if (item[0] !== ":" || !item.includes(":PROPERTIES:")) {
      return;
    }

    while (file.length > 0) {
      const it = file.shift()!;
      const idx = it.indexOf(":", 1);
      if (it[0] !== ":" || it.includes(":END:") || idx === -1) break;
      properties[it.substring(1, idx).toLowerCase()] = it
        .substring(idx + 1)
        .trim();
    }

    return properties;
  };

  const notes = [];
  const tags: Tags = {};

  let previous: { [n: number]: Note } = {};
  let prevLvl = -Infinity;

  while (file.length) {
    const item = file.shift()!;
    const note: Note = {
      title: "",
      description: "",
      state: "",
      tags: [],
      items: [],
      level: 0,
      properties: { id: v4() },
    };

    let level = 0;
    for (let i = 0; i < item!.length;) {
      if (new RegExp(/\*/).test(item![i]) && i === 0) {
        // level
        const [lvl, ni] = countLevel(i, item!);
        level = lvl;
        if (level === 0) break;
        if (!previous[level - 1] && level > 1) break;
        note.level = lvl;
        prevLvl = lvl;
        i = ni;
      } else if (new RegExp(/\:/).test(item[i])) {
        //tag
        const [tag, ni] = extractTag(i + 1, item);
        if (ni === 0) {
          note.title += item[i];
          i++;
          continue;
        }
        if (tag && level >= 1 && ni > 0) {
          i = ni;
          note.tags.push(tag);
          tags[tag] = tags[tag] ? ++tags[tag] : 1
        }
        i++;
      } else if (new RegExp(/[A-Z]/).test(item[i]) && i - 1 === level) {
        // state
        const [state, ni] = extractState(i, item);
        if (ni > 0) {
          i = ni;
          note.state = state;
        } else {
          note.title += item[i];
        }
      } else {
        note.title += item[i];
      }
      i++;
    }

    if (level === 0) {
      const properties = extractProperties(item);
      if (properties) {
        previous[prevLvl].properties = {
          ...previous[prevLvl].properties,
          ...properties,
        };
      } else {
        previous[prevLvl].description += item.trim() + "\n";
      }
      continue;
    } else if (previous[level - 1] && previous[level - 1].level < level) {
      previous[level - 1].items.push(note);
    } else {
      notes.push(note);
    }
    previous[level] = note;
  }

  return { notes, tags };
};

/**
 * Converts array of Notes to org string
 * @constructor
 * @param {Array<Note>} notes - array of type Note
 */

export const jsonToOrg = (notes: Notes): string => {
  let file = "";

  const buildTags = (tags: Array<string>) =>
    tags.reduce((curr, acc) => curr + ` :${acc}:`, "");

  const buildProperties = (properties: { [key: string]: string }) =>
    `:PROPERTIES:\n${Object.keys(properties).reduce(
      (acc, curr) => `${acc}:${curr}: ${properties[curr]}\n`,
      ""
    )}:END:\n`;

  for (let item of notes) {
    const tags = buildTags(item.tags);
    file += "*".repeat(item.level);
    file += item.state ? ` ${item.state}` : "";
    file += ` ${item.title}`;
    file += tags ? ` ${tags}` : "";
    file += "\n";
    file +=
      Object.keys(item.properties).length > 0
        ? buildProperties(item.properties)
        : "";
    file += item.description ? `${item.description}\n` : "";
    file += jsonToOrg(item.items);
  }

  return file;
};
