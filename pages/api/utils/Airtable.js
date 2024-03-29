const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);
const table = base(process.env.AIRTABLE_NAME);

const getMinifyRecords = (record) => {
  if (!record.fields.completed) {
    record.fields.completed = false;
  }
  return {
    id: record.id,
    fields: record.fields,
  };
};
const minifyRecords = (records) => {
  return records.map((record) => getMinifyRecords(record));
};
export { table, getMinifyRecords, minifyRecords };
