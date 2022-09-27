# org2json

library for converting org files to json and back.

# examples

converting org to json

```js
import { orgToJson } from "org2json";
const fs = require("fs");

console.log(orgToJson(fs.readFileSync("./inbox.org")));
```

converting json to org

```js
import { orgToJson } from "org2json";

const notes = [{ title: "hi" }];

console.log(jsonToOrg(notes));
```

# what's supported?

- [x] Title
- [x] Tags
- [x] Description
- [x] Nesting
- [x] Properties
- [] Lists
- [] Tables
- [] Comments
- [] Links
- [] Images
- [] markup
