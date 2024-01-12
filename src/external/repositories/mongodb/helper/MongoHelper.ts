import { MongoClient, Collection, Document } from "mongodb";

export const MongoHelper = {
	client: {} as MongoClient,
	async connect(uri: string): Promise<void> {
		this.client = await MongoClient.connect(uri);
	},
	async disconnect(): Promise<void> {
		await this.client.close(true);
	},
	getCollection<T extends Document>(collectionName: string): Collection<T> {
		return this.client.db().collection<T>(collectionName);
	},
	async clearCollection(collectionName: string): Promise<void> {
		await this.client.db().collection(collectionName).deleteMany({});
	},
};
