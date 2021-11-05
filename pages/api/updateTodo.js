import { table, getMinifyRecords } from './utils/Airtable';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  const { user } = await getSession(req);

  const { id, fields } = req.body;

  try {
    const updatedRecords = await table.update([{ id, fields }]);
    res.status(200).json(getMinifyRecords(updatedRecords[0]));
  } catch (error) {
    res.statusCode = 500;
    res.json({ message: 'Something went wrong' });
  }
});
