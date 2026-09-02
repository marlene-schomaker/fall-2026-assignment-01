import * as fs from 'node:fs/promises';

export async function logStatusToFile(
  filePath: string,
  statusMessage: string,
): Promise<void> {

  const timestamp = new Date().toISOString();

  const completeLogMessage = `${statusMessage} - ${timestamp}\n`;

  await fs.appendFile(filePath, completeLogMessage, 'utf-8');
}
