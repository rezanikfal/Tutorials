- Sample SQL Server Scalar Function with IF and WHILE
```sql
Alter Function dbo.coordArray(@FeatureId int)
Returns varchar(max)
AS
BEGIN
    Declare
        @Edges int,
        @Counter int = 1,
        @Array varchar(200) = ''
    BEGIN
        SET @Edges  = (SELECT TOP 1 Edges from [GIS].[dbo].[CoordinateData] where FeatureId = @FeatureId)
        WHILE ( @Counter <= @Edges+1)
        BEGIN 
            SET @Array = @Array+ '[' + STR((SELECT x from [GIS].[dbo].[CoordinateData] where FeatureId = @FeatureId and [Order] = @Counter), 8,4) + ', ' + STR((SELECT y from [GIS].[dbo].[CoordinateData] where FeatureId = @FeatureId and [Order] = @Counter), 8,4) + ']'
            If ( @Counter <> @Edges+1 ) 
            BEGIN
                SET @Array = @Array + ', '
            END
            SET @Counter = @Counter+ 1 
        END 
        Return '[[' +@Array + ']]';
    END
END
```
