import {colors} from './colors';

const button_primary = {
  backgroundColor: colors.primary,
  borderRadius: 10,
  padding: 15,
  marginTop: 15,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 50,
};

const button_primary_text = {
  color: colors.white,
  fontWeight: 'bold',
};

const button_alternate = {
  borderWidth: 2,
  borderRadius: 10,
  borderColor: colors.primary,
  padding: 15,
  marginBottom: 15,
  alignItems: 'center',
  justifyContent: 'space-around',
  width: 'auto',
};

const button_alternate_text = {
  color: colors.primary,
  fontWeight: 'bold',
};

const button_disabled = {
  backgroundColor: colors.disabled,
  borderRadius: 10,
  padding: 15,
  marginTop: 25,
  alignItems: 'center',
  justifyContent: 'center',
};

const button_disabled_text = {
  color: colors.black,
  fontWeight: 'bold',
};

const BPO = {
  button_primary,
  button_primary_text,
};

const BAO = {
  button_alternate,
  button_alternate_text,
};

const BDO = {
  button_disabled,
  button_disabled_text,
};

export {BPO, BDO, BAO};
