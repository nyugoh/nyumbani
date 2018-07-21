import { helper } from '@ember/component/helper';

export function capitalizeText(params/*, hash*/) {
  return params[0].toUpperCase();
}

export default helper(capitalizeText);
