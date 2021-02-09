## [7.0.5](https://github.com/thenativeweb/get-graphql-from-jsonschema/compare/7.0.4...7.0.5) (2021-02-09)


### Bug Fixes

* bump @types/json-schema from 7.0.6 to 7.0.7 ([#234](https://github.com/thenativeweb/get-graphql-from-jsonschema/issues/234)) ([9b8c11c](https://github.com/thenativeweb/get-graphql-from-jsonschema/commit/9b8c11cf8fbf9b4e3b995137fe948b590feae2ee))

## [7.0.4](https://github.com/thenativeweb/get-graphql-from-jsonschema/compare/7.0.3...7.0.4) (2021-01-27)


### Bug Fixes

* bump defekt from 6.0.1 to 6.0.2 ([#235](https://github.com/thenativeweb/get-graphql-from-jsonschema/issues/235)) ([10dc021](https://github.com/thenativeweb/get-graphql-from-jsonschema/commit/10dc0218b7cb12096bab9020208b9f1d91266f9e))

## [7.0.3](https://github.com/thenativeweb/get-graphql-from-jsonschema/compare/7.0.2...7.0.3) (2020-11-26)


### Bug Fixes

* bump defekt from 6.0.0 to 6.0.1 ([#209](https://github.com/thenativeweb/get-graphql-from-jsonschema/issues/209)) ([ca959f8](https://github.com/thenativeweb/get-graphql-from-jsonschema/commit/ca959f83fc15171ab487ee245809d5ead3dfbebe))

## [7.0.2](https://github.com/thenativeweb/get-graphql-from-jsonschema/compare/7.0.1...7.0.2) (2020-11-26)


### Bug Fixes

* bump defekt from 5.3.0 to 6.0.0 ([#207](https://github.com/thenativeweb/get-graphql-from-jsonschema/issues/207)) ([30bec0e](https://github.com/thenativeweb/get-graphql-from-jsonschema/commit/30bec0e673f5d0a7671738eb3c650641ef61da09))

## [7.0.1](https://github.com/thenativeweb/get-graphql-from-jsonschema/compare/7.0.0...7.0.1) (2020-11-26)


### Bug Fixes

* bump defekt from 5.2.2 to 5.3.0 ([#206](https://github.com/thenativeweb/get-graphql-from-jsonschema/issues/206)) ([96257a1](https://github.com/thenativeweb/get-graphql-from-jsonschema/commit/96257a1795b8d7b490d23b66af3c8ad6863cc18d))

# [7.0.0](https://github.com/thenativeweb/get-graphql-from-jsonschema/compare/6.0.5...7.0.0) (2020-11-13)


### Features

* Migrate to JSONSchema7. ([#197](https://github.com/thenativeweb/get-graphql-from-jsonschema/issues/197)) ([ad0290f](https://github.com/thenativeweb/get-graphql-from-jsonschema/commit/ad0290f37c3093c182febb1694b2ae72d260fa2a))


### BREAKING CHANGES

* Types are new incompatible with the previously used JSONSchema4 type.

## [6.0.5](https://github.com/thenativeweb/get-graphql-from-jsonschema/compare/6.0.4...6.0.5) (2020-11-03)


### Bug Fixes

* bump defekt from 5.2.1 to 5.2.2 ([#185](https://github.com/thenativeweb/get-graphql-from-jsonschema/issues/185)) ([b302b61](https://github.com/thenativeweb/get-graphql-from-jsonschema/commit/b302b616aaead63fbdc54bb1224c5ea77c364889))

## [6.0.4](https://github.com/thenativeweb/get-graphql-from-jsonschema/compare/6.0.3...6.0.4) (2020-11-03)


### Bug Fixes

* Fix headline for robot section in readme. ([#180](https://github.com/thenativeweb/get-graphql-from-jsonschema/issues/180)) ([0e1a43f](https://github.com/thenativeweb/get-graphql-from-jsonschema/commit/0e1a43f1774468392f31225aa28e4a86ad627071))

## [6.0.3](https://github.com/thenativeweb/get-graphql-from-jsonschema/compare/6.0.2...6.0.3) (2020-10-29)


### Bug Fixes

* bump defekt from 5.2.0 to 5.2.1 ([#176](https://github.com/thenativeweb/get-graphql-from-jsonschema/issues/176)) ([04a4cd3](https://github.com/thenativeweb/get-graphql-from-jsonschema/commit/04a4cd30138ac7310965c463e9e3789a92761fb1))

## [6.0.2](https://github.com/thenativeweb/get-graphql-from-jsonschema/compare/6.0.1...6.0.2) (2020-10-14)


### Bug Fixes

* bump defekt from 5.1.0 to 5.2.0 ([#173](https://github.com/thenativeweb/get-graphql-from-jsonschema/issues/173)) ([0583ef3](https://github.com/thenativeweb/get-graphql-from-jsonschema/commit/0583ef37521d75a303071ffe21ce1ba2ca9217d6))

## [6.0.1](https://github.com/thenativeweb/get-graphql-from-jsonschema/compare/6.0.0...6.0.1) (2020-09-02)


### Bug Fixes

* bump @types/json-schema from 7.0.5 to 7.0.6 ([#155](https://github.com/thenativeweb/get-graphql-from-jsonschema/issues/155)) ([25c6169](https://github.com/thenativeweb/get-graphql-from-jsonschema/commit/25c6169c9edf4c8e6e66272d3f4e2faf52742f1c))

# [6.0.0](https://github.com/thenativeweb/get-graphql-from-jsonschema/compare/5.0.3...6.0.0) (2020-08-03)


### Features

* Flip usage of oneOf/anyOf, since it was wrong. Add documentation. ([#142](https://github.com/thenativeweb/get-graphql-from-jsonschema/issues/142)) ([d91bfc1](https://github.com/thenativeweb/get-graphql-from-jsonschema/commit/d91bfc11cbd2bebff9d9a1eabb836571a6e5e708))


### BREAKING CHANGES

* It is impossible to map json schema's anyOf to GraphQL, since multiple
of the given schemas may match. GraphQL only provider exclusionary
union types, which correspond to oneOf in json schema.
So the terms had to be switched.

## [5.0.3](https://github.com/thenativeweb/get-graphql-from-jsonschema/compare/5.0.2...5.0.3) (2020-07-13)


### Bug Fixes

* bump defekt from 5.0.1 to 5.1.0 ([#133](https://github.com/thenativeweb/get-graphql-from-jsonschema/issues/133)) ([feb91fe](https://github.com/thenativeweb/get-graphql-from-jsonschema/commit/feb91fee7f761f8a3062cb1f8a9eac1cb3dc0c54))

## [5.0.2](https://github.com/thenativeweb/get-graphql-from-jsonschema/compare/5.0.1...5.0.2) (2020-06-10)


### Bug Fixes

* bump @types/json-schema from 7.0.4 to 7.0.5 ([#125](https://github.com/thenativeweb/get-graphql-from-jsonschema/issues/125)) ([676eb05](https://github.com/thenativeweb/get-graphql-from-jsonschema/commit/676eb05e9ec1d441b95215eb63615e1ca07a4976))

## [5.0.1](https://github.com/thenativeweb/get-graphql-from-jsonschema/compare/5.0.0...5.0.1) (2020-05-05)


### Bug Fixes

* runtime deps are in dev-dependencies ([#120](https://github.com/thenativeweb/get-graphql-from-jsonschema/issues/120)) ([594d1ac](https://github.com/thenativeweb/get-graphql-from-jsonschema/commit/594d1acbead52d32a51a3f95736a4cbc9d1d38b9))

# [5.0.0](https://github.com/thenativeweb/get-graphql-from-jsonschema/compare/4.1.0...5.0.0) (2020-02-26)


### Features

* Force major update. ([#94](https://github.com/thenativeweb/get-graphql-from-jsonschema/issues/94)) ([60f8669](https://github.com/thenativeweb/get-graphql-from-jsonschema/commit/60f8669dc68ae1467ee66cfd26962c8a237af253))


### BREAKING CHANGES

* Force major update, because both previous commits lost this.

# [4.1.0](https://github.com/thenativeweb/get-graphql-from-jsonschema/compare/4.0.0...4.1.0) (2020-02-26)


### Features

* Force major update. ([#93](https://github.com/thenativeweb/get-graphql-from-jsonschema/issues/93)) ([ff5d757](https://github.com/thenativeweb/get-graphql-from-jsonschema/commit/ff5d75792b6534141d00d71b9956f4d16cdfa79b))

# [4.0.0](https://github.com/thenativeweb/get-graphql-from-jsonschema/compare/3.0.1...4.0.0) (2020-02-26)


### Features

* Parse anyOf and ignore null. ([#91](https://github.com/thenativeweb/get-graphql-from-jsonschema/issues/91)) ([2b6bad7](https://github.com/thenativeweb/get-graphql-from-jsonschema/commit/2b6bad7910a849ea74826ecc0517bfc6ebc6ef0e))


### BREAKING CHANGES

* Changes the names of resulting types by appending
indexes for types and anyOfs.

* Update README.md

* fix: Update readme.

Co-authored-by: Golo Roden <golo.roden@thenativeweb.io>

## [3.0.1](https://github.com/thenativeweb/get-graphql-from-jsonschema/compare/3.0.0...3.0.1) (2020-02-03)


### Bug Fixes

* bump defekt from 5.0.0 to 5.0.1 ([#76](https://github.com/thenativeweb/get-graphql-from-jsonschema/issues/76)) ([d5a94e5](https://github.com/thenativeweb/get-graphql-from-jsonschema/commit/d5a94e5c33b580aacde238f2638066f425614a3c))
