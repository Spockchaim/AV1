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

    
    protected saveToFile(fileName: string, content: string): void {
        const filePath = path.join(this.dataDir, fileName);
        fs.writeFileSync(filePath, content, 'utf8');
    }

    
    protected readAllFiles(): string[] {
        if (!fs.existsSync(this.dataDir)) return [];
        const files = fs.readdirSync(this.dataDir);
        return files.map(file => fs.readFileSync(path.join(this.dataDir, file), 'utf8'));
    }

    
    protected appendToFile(fileName: string, line: string): void {
        const filePath = path.join(this.dataDir, fileName);
        fs.appendFileSync(filePath, line + '\n', 'utf8');
    }
}
