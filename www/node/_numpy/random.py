import numpy.random as rd

def randint(*a,**k):
    return rd.randint(*a,**k)
def randn(*a,**k):
    return rd.randn(*a,**k)
rand=rd.rand
def normal(*a,**k):
    return rd.normal(*a,**k)
def random(*a,**k):
    return rd.random(*a,**k)
def seed(*a,**k):
    return rd.seed(*a,**k)
def random_sample(*a,**k):
    return rd.random_sample(*a,**k)
def choice(*a,**k):
    return rd.choice(*a,**k)

binomial=rd.binomial
poisson=rd.poisson
beta=rd.beta
