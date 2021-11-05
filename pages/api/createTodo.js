import { table, minifyRecords } from './utils/Airtable';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  const session = getSession(req);
  const { description } = req.body;

  try {
    const createdRecords = await table.create([
      { fields: { description, userId: session.user.sub } },
    ]);
    const createdRecord = {
      id: createdRecords[0].id,
      fields: createdRecords[0].fields,
    };
    res.status(200).json(createdRecord);
  } catch (error) {
    res.statusCode = 500;
    res.json({ message: 'Something went wrong' });
  }
});
