// prisma ORM

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}

// TypeORM

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findUser(id: string): Promise<User> {
    return this.userRepo.findOne({ where: { id } });
  }
}

// #####

// Paginated Queries

async getUser(page: number, limit: number){
    
    return this.prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
    });

 }

