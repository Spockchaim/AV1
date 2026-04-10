import * as fs from 'fs';
import * as path from 'path';

export abstract class BaseRepository<T> {
    protected dataDir: string;

    constructor(subDir: string) {
        
        this.dataDir = path.join(__dirname, '../../data', subDir);
        this.ensureDirectoryExists();
    }

    private ensureDirectoryExists(): void {
        if (!fs.existsSync(this.dataDir)) {
            fs.mkdirSync(this.dataDir, { recursive: true });
        }
    }

    
    protected saveToFile(fileName: string, data: T): void {
        const filePath = path.join(this.dataDir, fileName);
        const jsonContent = JSON.stringify(data, null, 4);
        fs.writeFileSync(filePath, jsonContent, 'utf8');
    }


    protected readAllFiles(): T[] {
        if (!fs.existsSync(this.dataDir)) return [];
        const files = fs.readdirSync(this.dataDir).filter(file => file.endsWith('.json'));
        return files.map(file => {
            const content = fs.readFileSync(path.join(this.dataDir, file), 'utf8');
            return JSON.parse(content) as T;
        });
    }

    protected readFile(fileName: string): T | null {
        const filePath = path.join(this.dataDir, fileName);
        if (!fs.existsSync(filePath)) return null;
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content) as T;
    }
}
