from sqlalchemy import create_engine
from sqlalchemy import text

# Create an engine to the database
engine = create_engine('postgresql+psycopg2://qltrs:qltrs@localhost:15432/qltrs')

with engine.connect() as conn:
        result = conn.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_catalog = 'qltrs'"))
        print(result.all())


