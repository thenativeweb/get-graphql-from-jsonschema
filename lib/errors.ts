import { defekt } from 'defekt';

class SchemaInvalid extends defekt({ code: 'SchemaInvalid' }) {}
class TypeInvalid extends defekt({ code: 'TypeInvalid' }) {}

export {
  SchemaInvalid,
  TypeInvalid
};
