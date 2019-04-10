class DAO {
    
    constructor(model) {
        this.model = model;
    }

    paginate(query, page, limit) {
        return this.model.paginate(query, {
            select: '-password',
            page: page,
            limit: parseInt(limit),
            lean: true
        });
    }

    findById(id, lean = true, select = '-password') {
        let chain = this.model.findById(id).select(select);
        return lean ? chain.lean().exec() : chain.exec();
    }

    findOne(query, lean = true, select = '-password') {
        let chain = this.model.findOne(query).select(select);
        return lean ? chain.lean().exec() : chain.exec();
    }

    save(instance) {
        return instance.save();
    }

    update(id, data) {
        return this.model.findByIdAndUpdate(id, { $set: data }, { new: true });
    }

    delete(id) {
        return this.model.findByIdAndDelete(id);
    }

    find(query){
        return this.model.find(query).lean().exec();
    }
}

module.exports = DAO;

