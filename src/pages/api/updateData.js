import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'data.json');

function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] instanceof Object && target[key]) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }

  return { ...target, ...source };
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    const updatedData = req.body;
    
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
  const newJsonData = deepMerge(jsonData, updatedData);
    
  fs.writeFileSync(filePath, JSON.stringify(newJsonData, null, 2), 'utf-8');
    
  return res.status(200).json({ message: 'Данные успешно обновлены' });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}