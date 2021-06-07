const providerDocs = {
  createProvider: {
    url: "/providers",
    method: "post",
    data: {
      name,
      address,
      phone,
      email,
      description,
    },
  },
  getProviders: {
    method: "get",
    url: "/providers",
  },
  updateProvider: {
    method: "put",
    url: "/providers/:id",
    data: {
      name,
      address,
      phone,
      email,
      description,
    },
    description:
      "datani ichidagi hohlaganingni jonatasan, hech narsa required emas.",
  },
  deleteProvider: {
    method: "delete",
    url: "/provider/:id",
  },
};

const detailsDocs = {
  #createDetail: {
    url: "/details",
    method: "post",
    data: {
      name, // required
      price, // required
      provider, // required
      priceWithInstall,
      description,
      type,
    },
  },
  #getDetails: {
    method: "get",
    url: "/details",
  },
  #updateDetail: {
    method: "put",
    url: "/details/:id",
    data: {
        name, 
        price, 
        provider,
        priceWithInstall,
        description,
        type,
    },
    description:
      "datani ichidagi hohlaganingni jonatasan, hech narsa required emas.",
  },
  #deleteDetail: {
    method: "delete",
    url: "/details/:id",
  },
};



const servicesDocs = {
  #createService: {
    method: 'post',
    url: "/services",
    data: { 
      name, // required
      price // int required
     }
  },
  #getServices: {
    method: 'get',
    url: "/services"
  },
  #updateService: {
    method: 'put',
    url: '/services/:id',
    data: { 
      name,
      price
     }
  },
  #deleteService: {
    method: 'delete',
    url: 'services/:id'
  }
}
