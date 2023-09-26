import { GraphQLResolveInfo } from 'graphql';
import { GatewayContext } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Comment = {
  __typename?: 'Comment';
  commentContent?: Maybe<Scalars['String']['output']>;
  commentID?: Maybe<Scalars['ID']['output']>;
  fieldID?: Maybe<Scalars['String']['output']>;
  userID?: Maybe<Scalars['String']['output']>;
  userYear?: Maybe<Scalars['String']['output']>;
};

export type Faculty = {
  __typename?: 'Faculty';
  facultyID: Scalars['ID']['output'];
  facultyName: Scalars['String']['output'];
  fields: Array<Field>;
};

export type Field = {
  __typename?: 'Field';
  fieldID: Scalars['ID']['output'];
  fieldName: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment?: Maybe<Scalars['String']['output']>;
  createPost?: Maybe<Scalars['String']['output']>;
  login?: Maybe<Scalars['String']['output']>;
  updateUserInformation?: Maybe<Scalars['String']['output']>;
  verifiedOTP?: Maybe<Scalars['String']['output']>;
};


export type MutationCreateCommentArgs = {
  commentContent: Scalars['String']['input'];
  fieldID: Scalars['String']['input'];
  postID: Scalars['String']['input'];
  userYear: Scalars['Int']['input'];
};


export type MutationCreatePostArgs = {
  fieldID: Scalars['String']['input'];
  postDescription: Scalars['String']['input'];
  postTitle: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  userEmail: Scalars['String']['input'];
};


export type MutationUpdateUserInformationArgs = {
  fieldID: Scalars['String']['input'];
  userName: Scalars['String']['input'];
  userYear: Scalars['Int']['input'];
};


export type MutationVerifiedOtpArgs = {
  otp: Scalars['String']['input'];
  userEmail: Scalars['String']['input'];
};

export type Post = {
  __typename?: 'Post';
  comments?: Maybe<Array<Comment>>;
  fieldID?: Maybe<Scalars['ID']['output']>;
  postDescription: Scalars['String']['output'];
  postID?: Maybe<Scalars['ID']['output']>;
  postTitle: Scalars['String']['output'];
  userID: Scalars['ID']['output'];
  userName: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  postByFieldID: Array<Post>;
  postByID?: Maybe<Post>;
  postByUserID: Array<Post>;
  universities: Array<University>;
};


export type QueryPostByFieldIdArgs = {
  fieldID: Scalars['String']['input'];
};


export type QueryPostByIdArgs = {
  postID: Scalars['String']['input'];
};

export type University = {
  __typename?: 'University';
  faculties: Array<Faculty>;
  universityID: Scalars['ID']['output'];
  universityName: Scalars['String']['output'];
  universityOrder: Scalars['Int']['output'];
  universityShortName: Scalars['String']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Comment: ResolverTypeWrapper<Comment>;
  Faculty: ResolverTypeWrapper<Faculty>;
  Field: ResolverTypeWrapper<Field>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  University: ResolverTypeWrapper<University>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  Comment: Comment;
  Faculty: Faculty;
  Field: Field;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Post: Post;
  Query: {};
  String: Scalars['String']['output'];
  University: University;
}>;

export type CommentResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = ResolversObject<{
  commentContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  commentID?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  fieldID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userYear?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FacultyResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['Faculty'] = ResolversParentTypes['Faculty']> = ResolversObject<{
  facultyID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  facultyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fields?: Resolver<Array<ResolversTypes['Field']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FieldResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['Field'] = ResolversParentTypes['Field']> = ResolversObject<{
  fieldID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  fieldName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createComment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'commentContent' | 'fieldID' | 'postID' | 'userYear'>>;
  createPost?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'fieldID' | 'postDescription' | 'postTitle' | 'userName'>>;
  login?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'userEmail'>>;
  updateUserInformation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationUpdateUserInformationArgs, 'fieldID' | 'userName' | 'userYear'>>;
  verifiedOTP?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationVerifiedOtpArgs, 'otp' | 'userEmail'>>;
}>;

export type PostResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  comments?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType>;
  fieldID?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  postDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postID?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  postTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  postByFieldID?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostByFieldIdArgs, 'fieldID'>>;
  postByID?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostByIdArgs, 'postID'>>;
  postByUserID?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  universities?: Resolver<Array<ResolversTypes['University']>, ParentType, ContextType>;
}>;

export type UniversityResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['University'] = ResolversParentTypes['University']> = ResolversObject<{
  faculties?: Resolver<Array<ResolversTypes['Faculty']>, ParentType, ContextType>;
  universityID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  universityName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  universityOrder?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  universityShortName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = GatewayContext> = ResolversObject<{
  Comment?: CommentResolvers<ContextType>;
  Faculty?: FacultyResolvers<ContextType>;
  Field?: FieldResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  University?: UniversityResolvers<ContextType>;
}>;

