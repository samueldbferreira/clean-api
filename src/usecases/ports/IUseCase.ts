export interface IUseCase {
	execute(repositories: any): Promise<any>;
}
