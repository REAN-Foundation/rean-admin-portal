import { type Session } from "./session";
import { type ISessionCache } from "./session.cache.interface";
import { createClient, type RedisClientType } from 'redis';
import { SESSION_CACHE_HOST, SESSION_CACHE_PASSWORD } from "$env/static/private";
////////////////////////////////////////////////////////////////////////////////////////
// Using KeyDB as a Redis cache
// KeyDB is a high-performance fork of Redis with a focus on multithreading and memory efficiency
// It is designed to be a drop-in replacement for Redis
// KeyDB is fully compatible with Redis and supports all Redis commands
// 
// docker run \
// -d --name keydb \
// -p 6379:6379 \
// -e "SESSION_CACHE_PASSWORD=your-password" \
// -v /path/to/your/data:/data \
// -v /path/to/your/logs:/logs keydb/keydb \
// eqalpha/keydb

// Process to connect with KeyDB is same as Redis.
// 1. Run the docker container.
// 2. Set the password by logging into container
//    a. First run redis-cli as 
//       ```# redis-cli```
//    b. Set the password using
//       ```# auth <your-password>```
// 3. Create a client and connect to KeyDB.
// 4. Use the client to perform operations.
// 5. Close the connection when done.
//
////////////////////////////////////////////////////////////////////////////////////////

export class RedisCache implements ISessionCache {

    private _client: RedisClientType| null = null;

    private _expiry = 60 * 60 * 24; // 24 hours

    constructor() {
        // Create a client and connect to redis 
        try {
            this._client = createClient({
                url: SESSION_CACHE_HOST,
                password: SESSION_CACHE_PASSWORD
            });
            (async () => {
                if (this._client) await this._client.connect();
                console.log('Connected to Redis.');
            })();
            
        } catch (error) {
            console.log('Error in connected to Redis.', error);
        }
        
    }

    set = async (key: string, value: Session): Promise<void> => {
        if (this._client) {
            const exists = await this._client.exists(key);
            if (exists === 1) {
                await this._client.del(key);
            }
            await this._client.set(key, JSON.stringify(value), {
                EX: this._expiry,// 24 hours
            });
        }
    };

    get = async (key: string): Promise<Session | undefined> => {
        if (this._client) {
            const val = await this._client.get(key);
            if (val) {
                const session = JSON.parse(val) as Session;
                return session;
            }
        }
        return undefined;
    };

    has = async (key: string): Promise<boolean> => {
        if (this._client) {
            const exists = await this._client.exists(key);
            return exists === 1;
        }
        return false;
    };

    delete = async (key: string): Promise<boolean> => {
        if (this._client) {
            const exists = await this._client.exists(key);
            if (exists === 1) {
                await this._client.del(key);
                return true;
            }
        }
        return false;
    };

    clear = async (): Promise<void> => {
        if (this._client) {
            console.log('Clearing cache');
            this._client.flushAll();
        }
    };

    size = async (): Promise<number> => {
        if (this._client) {
            console.log('Getting cache size');
            this._client.dbSize();
        }
        return 0;
    };

}
