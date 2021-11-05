import { table, getMinifyRecords } from './utils/Airtable';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  const { user } = await getSession(req);

  const { id } = req.body;

  try {
    const deletedRecords = await table.destroy([id]);
    res.status(200).json(getMinifyRecords(deletedRecords[0]));
  } catch (error) {
    res.statusCode = 500;
    res.json({ message: 'Something went wrong' });
  }
  // table.destroy([id], function (err, deletedRecords) {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   console.log('Deleted', deletedRecords.length, 'records');
  // });
});
