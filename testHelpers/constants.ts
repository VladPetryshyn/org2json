export const org = `
* TODO hello world :Hello::Chao::oleg:
  thniantehatneohanoiahs>
  tnheaentoahneotheotehsa
** hello
*** bye
** js

* hi
  ntehneth
** the
   nethneothasnoitnhseatnohiatneonhtitahsni
*** tnhe
    tnheatneohaoithsaothsaoitnehsitnesa<
    ntihanetoahneotnesaotenosatenoas
**** tnheoneo
     ntheanteohasneothsaneothsnaotash[
***** thneitneh
      tnehsanteahsenthas
     
* tnhe
  ntehanteohsneothsaneothaesn
**** he
    `;

export const orgInJson = [
  {
    title: "hello world ",
    description: "thniantehatneohanoiahs>\ntnheaentoahneotheotehsa\n",
    state: "TODO",
    tags: ["Hello", "Chao", "oleg"],
    items: [
      {
        title: "hello",
        description: "",
        state: "",
        tags: [],
        items: [
          {
            title: "bye",
            description: "",
            state: "",
            tags: [],
            items: [],
            level: 3,
            properties: {},
          },
        ],
        level: 2,
        properties: {},
      },
      {
        title: "js",
        description: "",
        state: "",
        tags: [],
        items: [],
        level: 2,
        properties: {},
      },
    ],
    level: 1,
    properties: {},
  },
  {
    title: "hi",
    description: "ntehneth\n",
    state: "",
    tags: [],
    items: [
      {
        title: "the",
        description: "nethneothasnoitnhseatnohiatneonhtitahsni\n",
        state: "",
        tags: [],
        items: [
          {
            title: "tnhe",
            description:
              "tnheatneohaoithsaothsaoitnehsitnesa<\nntihanetoahneotnesaotenosatenoas\n",
            state: "",
            tags: [],
            items: [
              {
                title: "tnheoneo",
                description: "ntheanteohasneothsaneothsnaotash[\n",
                state: "",
                tags: [],
                items: [
                  {
                    title: "thneitneh",
                    description: "tnehsanteahsenthas\n",
                    state: "",
                    tags: [],
                    items: [],
                    level: 5,
                    properties: {},
                  },
                ],
                level: 4,
                properties: {},
              },
              {
                title: "he",
                description: "",
                state: "",
                tags: [],
                items: [],
                level: 4,
                properties: {},
              },
            ],
            level: 3,
            properties: {},
          },
        ],
        level: 2,
        properties: {},
      },
    ],
    level: 1,
    properties: {},
  },
  {
    title: "tnhe",
    description: "ntehanteohsneothsaneothaesn\n",
    state: "",
    tags: [],
    items: [],
    level: 1,
    properties: {},
  },
];
